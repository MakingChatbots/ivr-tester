#         | 1209 Hz  1336 Hz  1477 Hz  1633 Hz
# --------------------------------------------
# 697 Hz  |  1        2        3        A
# 770 Hz  |  4        5        6        B
# 852 Hz  |  7        8        9        C
# 941 Hz  |  *        0        #        D

# Play any of these tones by using play command, remove the file-type switch (-t) and the outfile file e.g.
# play -n -r 8000 -e u-law -c 1 -b 8 synth 0.5 sin 697 sin 1477 pad 0 0.5

# 0
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/0.raw synth 0.5 sin 941 sin 1336 pad 0 0.5
# 1
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/1.raw synth 0.5 sin 697 sin 1209 pad 0 0.5
# 2
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/2.raw synth 0.5 sin 697 sin 1336 pad 0 0.5
# 3
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/3.raw synth 0.5 sin 697 sin 1477 pad 0 0.5
# 4
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/4.raw synth 0.5 sin 770 sin 1209 pad 0 0.5
# 5
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/5.raw synth 0.5 sin 770 sin 1336 pad 0 0.5
# 6
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/6.raw synth 0.5 sin 770 sin 1477 pad 0 0.5
# 7
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/7.raw synth 0.5 sin 852 sin 1209 pad 0 0.5
# 8
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/8.raw synth 0.5 sin 852 sin 1336 pad 0 0.5
# 9
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/9.raw synth 0.5 sin 852 sin 1477 pad 0 0.5
# #
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/hash.raw synth 0.5 sin 941 sin 1477 pad 0 0.5
# *
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/asterisk.raw synth 0.5 sin 941 sin 1209 pad 0 0.5
# w (silence)
sox -n -r 8000 -t raw -e u-law -c 1 -b 8 ./src/call/dtmf/raw/w.raw synth 0.5 sin 1 vol 0dB
