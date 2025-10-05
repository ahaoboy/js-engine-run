#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Usage: $0 info.json"
  exit 1
fi

json_file="$1"

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required but not installed."
  exit 1
fi

is_windows=false
case "$(uname -s)" in
  *MINGW*|*MSYS*|*CYGWIN*) is_windows=true ;;
esac

skip_list=("goja")

CWD="$(cd "$(dirname "$0")" && pwd)"

run_test() {
    local name="$1"
    local subcmd="$2"

    echo run_test $name $subcmd

    if [ -z "$name" ]; then
        return 1
    fi

    local program_path
    program_path=$(which "$name" 2>/dev/null)
    echo program_path $program_path
    if [ -z "$program_path" ]; then
        return 1
    fi

    local dir
    dir=$(dirname "$program_path")

    for file in "__test_run__"/*.js; do
        if [ ! -f "$file" ]; then
            continue
        fi

      local filename=$(basename "$file")
      local output_file="$CWD/output/${filename%.*}.txt"
      (cd "$dir" && ./"$name" $subcmd $file > "$output_file" 2>&1) || true

      echo $name $subcmd $file

    done
}

prepare() {
    local src_dir="${1:-test}"
    local temp_dir="${2:-__test_run__}"

    if [ ! -d "$src_dir" ]; then
        echo "test dir not found '$src_dir'"
        return 1
    fi

    mkdir -p "$temp_dir"

    local has_before=false
    local has_after=false
    if [ -f "$src_dir/before.js" ]; then
        has_before=true
    fi
    if [ -f "$src_dir/after.js" ]; then
        has_after=true
    fi

    for file in "$src_dir"/*.js; do
        if [ ! -f "$file" ]; then
            continue
        fi

        local filename=$(basename "$file")

        if [ "$filename" = "before.js" ] || [ "$filename" = "after.js" ]; then
            continue
        fi


        {
            if [ "$has_before" = true ]; then
                cat "$src_dir/before.js"
            fi
            echo ""
            echo ""
            cat "$file"
            echo ""
            echo ""
            if [ "$has_after" = true ]; then
                cat "$src_dir/after.js"
            fi
        } > "$temp_dir/$filename"
    done
}

jq -c '.[]' "$json_file" | while IFS= read -r item; do
  name=$(echo "$item" | jq -r '.bin // .name')
  subcmd=$(echo "$item" | jq -r '.subcmd // ""')
  echo $name $subcmd

  prepare

  mkdir -p output

  run_test $name $subcmd
done
