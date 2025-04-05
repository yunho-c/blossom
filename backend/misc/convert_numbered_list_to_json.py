import json
import re
import argparse


def convert_cars_to_json(input_file, output_file):
    with open(input_file, "r") as f:
        lines = f.readlines()

    # Extract car names by removing numbering (e.g., "1. ")
    car_names = []
    for line in lines:
        # Remove leading/trailing whitespace and numbering
        line = line.strip()
        if not line:
            continue

        # Remove numbering pattern (digits followed by dot and optional whitespace)
        car_name = re.sub(r"^\d+\.\s*", "", line)
        car_names.append(car_name)

    # Write to output file as JSON
    with open(output_file, "w") as f:
        json.dump(car_names, f, indent=2)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert numbered list to JSON")
    parser.add_argument("input_file", help="Path to input text file")
    parser.add_argument("output_file", help="Path to output JSON file")
    args = parser.parse_args()

    convert_cars_to_json(args.input_file, args.output_file)
