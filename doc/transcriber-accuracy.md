# Transcriber Accuracy

The ability write instructions in your test definition that reflect your actual IVR flow is important to making
your defintion 


```
PDR-5873:recordings lucas$ asr-eval -o original.txt -g transcription-google.txt
Word Error Rate (WER): 52.94117647058824%

PDR-5873:recordings lucas$ asr-eval -o original.txt -g transcription-google.txt
Word Error Rate (WER): 14.705882352941178%

PDR-5873:recordings lucas$ asr-eval -o original.txt -g transcription-google.txt -c
Word Error Rate (WER): 14.705882352941178%

Text Comparison:


press 1 for playback flow press 2 for long pausescalls flowis so press 3 for short latency flow press 4 for long latency flow please enter a number you entered the value 0123456789 thank you
PDR-5873:recordings lucas$ asr-eval -o original.txt -g transcription-aws.txt -c
Word Error Rate (WER): 52.94117647058824%

Text Comparison:


press 1one for playbackplay flowback flew press 2two for long pausespools flowis flew press 3three for short latency flowflew press 4fourth foralong longeleventy latencyflu flow please enter a number you entered the valuevalley 0123456789 thank you
PDR-5873:recordings lucas$ asr-eval -o original.txt -g transcription-google-with-training.txt -c
Word Error Rate (WER): 14.705882352941178%

Text Comparison:


press 1 for playback flow press 2 for long pausescalls flowis so press 3 for short latency flow press 4 for long latency flow please enter a number you entered the value 0123456789 thank you
PDR-5873:recordings lucas$ asr-eval -o original.txt -g transcription-google-with-training.txt -e
Word Error Rate (WER): 14.705882352941178%
```
