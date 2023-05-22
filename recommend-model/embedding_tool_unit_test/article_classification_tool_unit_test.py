import unittest
import warnings
from transformers import pipeline,AutoTokenizer,AutoModel
from transformers import AutoModelForSequenceClassification
from transformers import TrainingArguments
from transformers import Trainer
from transformers import DataCollatorWithPadding

from datasets import load_dataset
import torch

class ArticleClassificationToolUnitTest(unittest.TestCase):
    def test_learn(self):
        # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_learn
        classifier = pipeline("sentiment-analysis")
        result = classifier([
            
                "I've been waiting for a HuggingFace course my whole life.",
                "I hate this so much!"
            
        ])
        print(result)
    
    def test_tokenizer(self):
        # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_tokenizer
        checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
        tokenizer = AutoTokenizer.from_pretrained(checkpoint)
        raw_inputs = [
            
                "I've been waiting for a HuggingFace course my whole life.",
                "I hate this so much!"
            
        ]
        inputs = tokenizer(raw_inputs, padding=True,truncation=True,return_tensors="pt")
        print(inputs)
        tokenizer.decode([101,1045,1005,102])
        model = AutoModel.from_pretrained(checkpoint)
        outputs = model(**inputs)
        print(outputs.last_hidden_state.shape)
        print(outputs.logits.shape)
    
    def test_classification(self):
        # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_classification
        from transformers import AutoModelForSequenceClassification
        checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
        tokenizer = AutoTokenizer.from_pretrained(checkpoint)
        raw_inputs = [
            
                "I've been waiting for a HuggingFace course my whole life.",
                "I hate this so much!"
            
        ]
        inputs = tokenizer(raw_inputs, padding=True,truncation=True,return_tensors="pt")
        model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
        outputs = model(**inputs)
        print(outputs.logits.shape)
        predictions = torch.nn.functional.softmax(outputs.logits,dim=-1)
        print(predictions)
        print(model.config.id2label)
    
    def test_prepare_dataset(self):
         # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_prepare_dataset
        raw_datasets = load_dataset("glue","mrpc")
        print(raw_datasets)
        checkpoint = "bert-base-uncased"
        tokenizer = AutoTokenizer.from_pretrained(checkpoint)
        inputs = tokenizer("This is the first sentence","This is the second one")
        print(inputs)
        print(tokenizer.convert_ids_to_tokens(inputs["input_ids"]))
        
        def tokenize_function(example):
            return tokenizer(example["sentence1"],example["sentence2"],truncation=True)
        tokenized_datasets = raw_datasets.map(tokenize_function,batched=True)
        print(tokenized_datasets)
        data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
        samples = tokenized_datasets["train"][:8]
        samples = {k:v for  k,v in samples.items() if k not in ["idx","sentence1","sentence2"]}
        print(samples)
        length_list = [len(x) for x in samples["input_ids"]]
        print(length_list)
        batch = data_collator(samples)
        batch_dict = {k:v.shape for k,v in batch.items()}
        print(batch_dict)
        
        training_args = TrainingArguments("test-trainer")
        print(training_args)
        
    def test_train(self):
        # python  -m unittest article_classification_tool_unit_test.ArticleClassificationToolUnitTest.test_train
        from transformers import AutoModelForSequenceClassification
        raw_datasets = load_dataset("glue","mrpc")
        print(raw_datasets)
        checkpoint = "bert-base-uncased"
        model = AutoModelForSequenceClassification.from_pretrained(checkpoint,num_labels=2)
        tokenizer = AutoTokenizer.from_pretrained(checkpoint)
        inputs = tokenizer("This is the first sentence","This is the second one")
        print(inputs)
        print(tokenizer.convert_ids_to_tokens(inputs["input_ids"]))
        
        def tokenize_function(example):
            return tokenizer(example["sentence1"],example["sentence2"],truncation=True)
        tokenized_datasets = raw_datasets.map(tokenize_function,batched=True)
        print(tokenized_datasets)
        training_args = TrainingArguments("test-trainer")
        data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
        print(training_args)
        trainer = Trainer(
            model,
            training_args,
            train_dataset= tokenized_datasets["train"],
            eval_dataset= tokenized_datasets["validation"],
            data_collator=data_collator,
            tokenizer=tokenizer
        )
        trainer.train()
        predictions=trainer.predict(tokenized_datasets["validation"])
        print(predictions.predictions.shape,predictions.label_ids.shape)
        import numpy as np
        preds = np.argmax(predictions.predictions,axis=-1)
        from datasets import load_metric
        metric = load_metric("glue","mrpc")
        metric.compute(predictions=preds,references=predictions.label_ids)
        def compute_metrics(eval_preds):
            metric = load_metric("glue","mrpc")
            logits, labels = eval_preds
            predictions = np.argmax(logits,axis=-1)
            return metric.compute(predictions=predictions,references=labels)
            
        
        