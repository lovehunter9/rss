from recommend_model_sdk.tools.model_tool import ModelTool

def infer(docList):
    # python  -m unittest model_tool_unit_test.ModelToolUnitTest.test_infer
    download_dir = "/model"
    current_model_tool = ModelTool(download_dir)
    model_name = "word2vec_google"
    model_version = "v1"
    print(current_model_tool.infer(model_name,model_version,docList))

def initModel():
    download_dir = "/model"
    current_model_tool = ModelTool(download_dir)
    model_name = "word2vec_google"
    model_version = "v1"
    current_model_tool.init_model(model_name,model_version)

def download():
    download_dir = "/model"
    current_model_tool = ModelTool(download_dir)
    model_name = "word2vec_google"
    model_version = "v1"
    latest_number = 1000
    latest_package_key = f'{model_name}_{model_version}_latest_package_{latest_number}'
    
    article_embedding_dict = current_model_tool.download_latest_article_embedding_package(model_name,model_version,latest_number)
    # print(article_embedding_list)
    article_list = article_embedding_dict["articles"]
    embedding_list = article_embedding_dict["embeddings"]
    print(article_list[0].keys())
    print(article_list[0]["url"])
    print(embedding_list[0].keys())
