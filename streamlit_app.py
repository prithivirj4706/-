import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(page_title="Valentine's for Kutachi 😼", layout="wide", initial_sidebar_state="collapsed")

# Read files
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

with open("style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

with open("script.js", "r", encoding="utf-8") as f:
    js_content = f.read()

# Inline CSS and JS into HTML for Streamlit Cloud compatibility
full_html = html_content.replace('<link rel="stylesheet" href="style.css">', f'<style>{css_content}</style>')
full_html = full_html.replace('<script src="script.js"></script>', f'<script>{js_content}</script>')

# Display HTML
components.html(full_html, height=1500, scrolling=True)
