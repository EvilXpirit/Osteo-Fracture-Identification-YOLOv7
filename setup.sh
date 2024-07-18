#!/bin/bash

mkdir -p ~/.streamlit/
echo "\
[server]\n\
headless = true\n\
port = $PORT\n\
enableCORS = false\n\
" > ~/.streamlit/config.toml

# Install necessary dependencies
sudo apt-get update
sudo apt-get install libgl1-mesa-glx libglib2.0-0