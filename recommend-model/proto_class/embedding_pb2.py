# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: embedding.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0f\x65mbedding.proto\"\xa2\x01\n\x07\x41rticle\x12\x0b\n\x03url\x18\x01 \x01(\t\x12\x11\n\tfull_text\x18\x02 \x01(\t\x12\x12\n\ncreated_at\x18\x03 \x01(\x04\x12\x14\n\x0cpublished_at\x18\x04 \x01(\x04\x12\r\n\x05title\x18\x05 \x01(\t\x12\x0e\n\x06\x61uthor\x18\x06 \x01(\t\x12\x0f\n\x07\x63ontent\x18\x07 \x01(\t\x12\x0f\n\x07\x66\x65\x65\x64_id\x18\x08 \x01(\x04\x12\x0c\n\x04hash\x18\t \x01(\t\"W\n\tEmbedding\x12\x0b\n\x03url\x18\x01 \x01(\t\x12\x12\n\nmodel_name\x18\x02 \x01(\t\x12\x15\n\rmodel_version\x18\x03 \x01(\t\x12\x12\n\nembeddings\x18\x04 \x03(\x02\"K\n\rLatestPackage\x12\x1a\n\x08\x61rticles\x18\x01 \x03(\x0b\x32\x08.Article\x12\x1e\n\nembeddings\x18\x02 \x03(\x0b\x32\n.Embedding\",\n\x0e\x41rticlePackage\x12\x1a\n\x08\x61rticles\x18\x01 \x03(\x0b\x32\x08.Article\"2\n\x10\x45mbeddingPakcage\x12\x1e\n\nembeddings\x18\x01 \x03(\x0b\x32\n.Embedding\"\xac\x01\n\x04\x46\x65\x65\x64\x12\n\n\x02id\x18\x01 \x01(\x03\x12\x10\n\x08\x66\x65\x65\x64_url\x18\x02 \x01(\t\x12\x10\n\x08site_url\x18\x03 \x01(\t\x12\r\n\x05title\x18\x04 \x01(\t\x12\x13\n\x0b\x63\x61tegory_id\x18\x05 \x01(\x03\x12\x16\n\x0e\x63\x61tegory_title\x18\x06 \x01(\t\x12\x0f\n\x07icon_id\x18\x07 \x01(\x03\x12\x11\n\ticon_type\x18\x08 \x01(\t\x12\x14\n\x0cicon_content\x18\t \x01(\x0c\"#\n\x0b\x46\x65\x65\x64Package\x12\x14\n\x05\x66\x65\x65\x64s\x18\x01 \x03(\x0b\x32\x05.Feedb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'embedding_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _ARTICLE._serialized_start=20
  _ARTICLE._serialized_end=182
  _EMBEDDING._serialized_start=184
  _EMBEDDING._serialized_end=271
  _LATESTPACKAGE._serialized_start=273
  _LATESTPACKAGE._serialized_end=348
  _ARTICLEPACKAGE._serialized_start=350
  _ARTICLEPACKAGE._serialized_end=394
  _EMBEDDINGPAKCAGE._serialized_start=396
  _EMBEDDINGPAKCAGE._serialized_end=446
  _FEED._serialized_start=449
  _FEED._serialized_end=621
  _FEEDPACKAGE._serialized_start=623
  _FEEDPACKAGE._serialized_end=658
# @@protoc_insertion_point(module_scope)
