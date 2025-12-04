from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv(dotenv_path="../.env")
openai_api_key = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=openai_api_key)

def find_components(text: str):
    prompt =f"""
    Developer: You are an expert electronics engineer. Given a user's project idea input as {text}, generate a JSON object listing the required electronic components for the project, strictly following the structure and specifications below.
    Instructions:
    - Identify 3-7 conceptual steps to design the solution (do not include this checklist in your final output).
    - For each component:
      - The "name" field must be a short, searchable family/series part name (e.g., "ESP32-WROOM", "STM32F4", "LIS3DH", "AMS1117", "WS2812B"). If the project details are ambiguous, choose a widely used, typical family or series that fits. If no suitable part family can be justified, omit the component.
      - The "quantity" field must be a numeric string (e.g., "1", "3"); use "1" unless more are clearly required.
      - The "description" field must have 1-2 concise technical sentences explaining the component's purpose and key specifications.
    - Include only common electronic components that are readily available from mainstream suppliers.
    - Do not include mechanical parts, hardware, or tools.
    - Order items by importance to the project's core functionality.
    - If the project description is malformed or unclear, output: {{ "components": [] }}.
    - If no suitable family-level part name exists, omit that component.
    - Before generating the output, confirm that your list complies strictly with the required JSON schema and output format.
    - Output only the JSON object, matching the schema below. Do not add explanations, Markdown, or any other content.

    ## Output Format
    Return a serialized JSON object in this form:
    {{
      "components": [
        {{
          "name": "<part family/series name>",
          "quantity": "<number as string>",
          "description": "<short description>"
        }}
        // ... additional components
      ]
    }}
  """
    
    response = client.responses.create(
        model="gpt-5-nano",
        input=prompt

    )

    output_text = response.output_text
    
    try:
        data = json.loads(output_text)
    except json.JSONDecodeError:
        raise ValueError("Model did not return valid JSON")

    return data


if __name__ == "__main__":
    print(find_components("I want to build a line follower robot with an STM32L4"))