import girder_client
import json
import os
import click


apiURL = "viame.kitware.com"
limit = 10  # only want to upload 10 videos

def bytesto(bytes, to, bsize=1024):
    """convert bytes to megabytes, etc.
       sample code:
           print('mb= ' + str(bytesto(314575262000000, 'm')))
       sample output: 
           mb= 300002347.946
    """

    a = {'k' : 1, 'm': 2, 'g' : 3, 't' : 4, 'p' : 5, 'e' : 6 }
    r = float(bytes)
    for i in range(a[to]):
        r = r / bsize

    return(r)


def login():
    gc = girder_client.GirderClient(apiURL, port=443, apiRoot='girder/api/v1')
    gc.authenticate(interactive=True)
    return gc

def get_datasets(gc):
    return gc.sendRestRequest('GET', 'dive_dataset?limit=9999999999&sort=created&sortdir=-1&published=false&shared=false')

def analyze_data(data):
    videos = []
    image_sequences = []
    total_video_size = 0
    total_image_size = 0
    fps_distribution = { }
    for item in data:
        if 'meta' in item.keys():
            if 'type' in item['meta'].keys():
                if 'video' == item['meta']['type']:
                    originalFPS = 'unknown'
                    if 'originalFps' in item['meta'].keys():
                        originalFPS =  item['meta']['originalFps']
                        if originalFPS in fps_distribution.keys():
                            fps_distribution[originalFPS] += 1
                        else:
                            fps_distribution[originalFPS] = 1
                    videos.append({
                        'originalFps': originalFPS,
                        'fps': item['meta']['fps'],
                        'size': item['size'],
                    })
                    total_video_size += item['size']
                if 'image-sequence' == item['meta']['type']:
                    image_sequences.append({
                        'size': item['size'],
                    })
                    total_image_size += item['size']
    
    print(f'Total Datasets: {len(data)}')
    print(f'Total Videos: {len(videos)}')
    print(f'Total Image-Sequeneces: {len(image_sequences)}')
    totalVideoGB = bytesto(total_video_size, 'g')
    totalImageGB = bytesto(total_image_size, 'g')
    print(f'Total Video Size: {totalVideoGB} GB')
    print(f'Total Image Size: {totalImageGB} GB')
     
    print(dict(sorted(fps_distribution.items(), key=lambda d: d[1])))
    

    
@click.command(name="Analyze Data", )
def load_data():
    # search the folder for .mp4 videos
    # now we create folders and upload the video files to them.
    gc = login()
    data = get_datasets(gc)
    analyze_data(data)

if __name__ == '__main__':
    load_data()
