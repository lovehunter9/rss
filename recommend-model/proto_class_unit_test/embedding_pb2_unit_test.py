import unittest
import proto_class.embedding_pb2 
class EmbeddingPB2UnitTest(unittest.TestCase):
    def test_create(self):
        # python  -m unittest embedding_pb2_unit_test.EmbeddingPB2UnitTest.test_create
        current_embedding = proto_class.embedding_pb2.Embedding()
        current_embedding.url = "ok"
        current_embedding.embeddings.append(1)
        current_embedding.embeddings.append(2)
        serialize_data = current_embedding.SerializeToString()
        print(type(serialize_data))
        print(current_embedding.embeddings)