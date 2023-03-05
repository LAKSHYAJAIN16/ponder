import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')

while True:
    sequence = input("enter prompt: ")
    max_len = int(input("enter max len : "))
    temperature = float(input("enter temperature"))
    top_k = int(input("enter top_k"))
    inputs = tokenizer.encode(sequence, return_tensors="pt")
    outputs=model.generate(inputs, do_sample=True, max_length=max_len, temperature=temperature, top_k=top_k)
    text=tokenizer.decode(outputs[0], skip_special_tokens=True)
    print(text)