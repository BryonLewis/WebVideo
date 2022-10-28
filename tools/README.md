`ffmpeg -i transcoded.mp4 -vf "drawtext=fontfile=Roboto-Black.ttf:text='frame\:%{n}':x=(w-tw)/2: y=h-h+(2*lh):fontcolor=black:fontsize=40:box=1:boxcolor=white:boxborderw=10,drawtext=fontsize=60:fontcolor=yellow:text='%{e\:t}':x=(w-text_w):y=(h-h+text_h),drawtext=fontsize=60:fontcolor=red:text='%{pict_type}':x=(w-tw)/2: y=h-h+(4*lh)" -c:a copy output.mp4`

https://ffmpeg.org/ffmpeg-filters.html#drawtext


ffprobe -select_streams v -hide_banner -show_entries frame=start_time,pkt_pts_time,best_effort_timestamp_time,pict_type output.mp4 -of json > log.json