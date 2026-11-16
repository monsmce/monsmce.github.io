#!/usr/bin/env bash
# Turn a clip into the scroll frame sequence.
# Usage: tools/espresso.sh <clip.mp4> <start-seconds> <end-seconds>
# Then set espresso.frames in js/content.js to the number printed.
set -e
OUT=assets/food/espresso
rm -f "$OUT"/f-*.webp
# colorlevels pushes the near-black background to pure black so it melts into the page.
ffmpeg -v error -y -ss "$2" -to "$3" -i "$1" -an \
  -vf "scale=1280:720,colorlevels=rimin=0.06:gimin=0.06:bimin=0.05" \
  -c:v libwebp -quality 72 -start_number 0 "$OUT/f-%03d.webp"
N=$(ls "$OUT"/f-*.webp | wc -l)
cp "$OUT/f-$(printf %03d $((N-1))).webp" "$OUT/still.webp"
echo "frames: $N"
