// Copyright 2022 Redpanda Data, Inc.
//
// Use of this software is governed by the Business Source License
// included in the file https://github.com/redpanda-data/redpanda/blob/dev/licenses/bsl.md
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0

//go:build integration

package api

import (
	"context"
	"fmt"
	"net/http"
	"testing"

	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	v1pb "github.com/redpanda-data/console/backend/pkg/protogen/redpanda/api/console/v1alpha"
	v1ac "github.com/redpanda-data/console/backend/pkg/protogen/redpanda/api/console/v1alpha/consolev1alphaconnect"
	"github.com/redpanda-data/console/backend/pkg/testutil"
)

func (s *APIIntegrationTestSuite) TestListMessages() {
	t := s.T()

	require := require.New(t)
	assert := assert.New(t)

	// setup
	ctx := context.Background()

	client := v1ac.NewConsoleServiceClient(
		http.DefaultClient,
		s.httpAddress(),
		connect.WithGRPCWeb(), // use GRPCWeb because we also expect this endpoint to be called by web client
	)

	topicName := testutil.TopicNameForTest("list_messages_0")
	testutil.CreateTestData(t, context.Background(), s.kafkaClient, s.kafkaAdminClient,
		topicName)

	defer func() {
		s.kafkaAdminClient.DeleteTopics(context.Background(), topicName)
	}()

	t.Run("simple happy path", func(t *testing.T) {
		stream, err := client.ListMessages(ctx, connect.NewRequest(&v1pb.ListMessagesRequest{
			Topic:       topicName,
			StartOffset: -2,
			PartitionId: -1,
			MaxResults:  100,
		}))
		require.NoError(err)

		keys := make([]string, 0, 20)
		phaseCount := 0
		doneCount := 0
		progressCount := 0
		errorCount := 0
		seenZeroOffset := false
		for stream.Receive() {
			msg := stream.Msg()
			switch cm := msg.GetControlMessage().(type) {
			case *v1pb.ListMessagesResponse_Data:
				if seenZeroOffset {
					assert.NotEmpty(cm.Data.Offset)
				}

				if cm.Data.Offset == 0 {
					seenZeroOffset = true
				}

				assert.NotEmpty(cm.Data.Timestamp)
				assert.NotEmpty(cm.Data.Compression)
				assert.NotEmpty(cm.Data.Headers)

				for _, h := range cm.Data.Headers {
					h := h
					assert.NotEmpty(h)
					assert.NotEmpty(h.Key)
					assert.NotEmpty(h.Value)
				}

				key := string(cm.Data.GetKey().GetNormalizedPayload())
				keys = append(keys, key)

				assert.NotEmpty(cm.Data.GetKey())
				assert.NotEmpty(cm.Data.GetKey().GetNormalizedPayload())
				assert.Empty(cm.Data.GetKey().GetOriginalPayload())
				assert.NotEmpty(cm.Data.GetKey().GetPayloadSize())
				assert.Equal(v1pb.PayloadEncoding_PAYLOAD_ENCODING_TEXT, cm.Data.GetKey().GetEncoding())
				assert.False(cm.Data.GetKey().GetIsPayloadTooLarge())
				assert.Empty(cm.Data.GetKey().GetTroubleshootReport())

				assert.NotEmpty(cm.Data.GetValue())
				assert.NotEmpty(cm.Data.GetValue().GetNormalizedPayload())
				assert.Empty(cm.Data.GetValue().GetOriginalPayload())
				assert.NotEmpty(cm.Data.GetValue().GetPayloadSize())
				assert.Equal(v1pb.PayloadEncoding_PAYLOAD_ENCODING_JSON, cm.Data.GetValue().GetEncoding())
				assert.False(cm.Data.GetValue().GetIsPayloadTooLarge())
				assert.Empty(cm.Data.GetValue().GetTroubleshootReport())

				assert.Equal(fmt.Sprintf(`{"ID":"%s"}`, key), string(cm.Data.GetValue().GetNormalizedPayload()))
			case *v1pb.ListMessagesResponse_Done:
				doneCount++

				assert.NotEmpty(cm.Done.GetBytesConsumed())
				assert.NotEmpty(cm.Done.GetMessagesConsumed())
				assert.NotEmpty(cm.Done.GetElapsedMs())
				assert.False(cm.Done.GetIsCancelled())
			case *v1pb.ListMessagesResponse_Phase:
				if phaseCount == 0 {
					assert.Equal("Get Partitions", cm.Phase.GetPhase())
				} else if phaseCount == 1 {
					assert.Equal("Get Watermarks and calculate consuming requests", cm.Phase.GetPhase())
				} else if phaseCount == 2 {
					assert.Equal("Consuming messages", cm.Phase.GetPhase())
				} else {
					assert.Fail("Unknown phase.")
				}

				phaseCount++
			case *v1pb.ListMessagesResponse_Progress:
				progressCount++

				assert.NotEmpty(cm.Progress)
				assert.NotEmpty(cm.Progress.GetBytesConsumed())
				assert.NotEmpty(cm.Progress.GetMessagesConsumed())
			case *v1pb.ListMessagesResponse_Error:
				errorCount++
			}
		}

		assert.Nil(stream.Err())
		assert.Nil(stream.Close())
		assert.Equal(
			[]string{"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"},
			keys)
		assert.Equal(3, phaseCount)
		assert.Equal(0, errorCount)
		assert.GreaterOrEqual(progressCount, 0)
	})

	t.Run("with troubleshoot and raw payload", func(t *testing.T) {
		stream, err := client.ListMessages(ctx, connect.NewRequest(&v1pb.ListMessagesRequest{
			Topic:                     topicName,
			StartOffset:               -2,
			PartitionId:               -1,
			MaxResults:                100,
			Troubleshoot:              true,
			IncludeOriginalRawPayload: true,
		}))
		require.NoError(err)

		keys := make([]string, 0, 20)
		phaseCount := 0
		doneCount := 0
		progressCount := 0
		errorCount := 0
		seenZeroOffset := false
		for stream.Receive() {
			msg := stream.Msg()
			switch cm := msg.GetControlMessage().(type) {
			case *v1pb.ListMessagesResponse_Data:
				if seenZeroOffset {
					assert.NotEmpty(cm.Data.Offset)
				}

				if cm.Data.Offset == 0 {
					seenZeroOffset = true
				}

				assert.NotEmpty(cm.Data.Timestamp)
				assert.NotEmpty(cm.Data.Compression)
				assert.NotEmpty(cm.Data.Headers)

				for _, h := range cm.Data.Headers {
					h := h
					assert.NotEmpty(h)
					assert.NotEmpty(h.Key)
					assert.NotEmpty(h.Value)
				}

				key := string(cm.Data.GetKey().GetNormalizedPayload())
				keys = append(keys, key)

				assert.NotEmpty(cm.Data.GetKey())
				assert.NotEmpty(cm.Data.GetKey().GetNormalizedPayload())
				assert.NotEmpty(cm.Data.GetKey().GetOriginalPayload())
				assert.NotEmpty(cm.Data.GetKey().GetPayloadSize())
				assert.Equal(v1pb.PayloadEncoding_PAYLOAD_ENCODING_TEXT, cm.Data.GetKey().GetEncoding())
				assert.False(cm.Data.GetKey().GetIsPayloadTooLarge())
				assert.NotEmpty(cm.Data.GetKey().GetTroubleshootReport())

				assert.NotEmpty(cm.Data.GetValue())
				assert.NotEmpty(cm.Data.GetValue().GetNormalizedPayload())
				assert.NotEmpty(cm.Data.GetValue().GetOriginalPayload())
				assert.NotEmpty(cm.Data.GetValue().GetPayloadSize())
				assert.Equal(v1pb.PayloadEncoding_PAYLOAD_ENCODING_JSON, cm.Data.GetValue().GetEncoding())
				assert.False(cm.Data.GetValue().GetIsPayloadTooLarge())
				assert.NotEmpty(cm.Data.GetValue().GetTroubleshootReport())

				assert.Equal(fmt.Sprintf(`{"ID":"%s"}`, key), string(cm.Data.GetValue().GetNormalizedPayload()))
			case *v1pb.ListMessagesResponse_Done:
				doneCount++

				assert.NotEmpty(cm.Done.GetBytesConsumed())
				assert.NotEmpty(cm.Done.GetMessagesConsumed())
				assert.NotEmpty(cm.Done.GetElapsedMs())
				assert.False(cm.Done.GetIsCancelled())
			case *v1pb.ListMessagesResponse_Phase:
				if phaseCount == 0 {
					assert.Equal("Get Partitions", cm.Phase.GetPhase())
				} else if phaseCount == 1 {
					assert.Equal("Get Watermarks and calculate consuming requests", cm.Phase.GetPhase())
				} else if phaseCount == 2 {
					assert.Equal("Consuming messages", cm.Phase.GetPhase())
				} else {
					assert.Fail("Unknown phase.")
				}

				phaseCount++
			case *v1pb.ListMessagesResponse_Progress:
				progressCount++

				assert.NotEmpty(cm.Progress)
				assert.NotEmpty(cm.Progress.GetBytesConsumed())
				assert.NotEmpty(cm.Progress.GetMessagesConsumed())
			case *v1pb.ListMessagesResponse_Error:
				errorCount++
			}
		}

		assert.Nil(stream.Err())
		assert.Nil(stream.Close())
		assert.Equal(
			[]string{"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"},
			keys)
		assert.Equal(3, phaseCount)
		assert.Equal(0, errorCount)
		assert.GreaterOrEqual(progressCount, 0)
	})
}
