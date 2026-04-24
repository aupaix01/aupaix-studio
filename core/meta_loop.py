import json; import time; from datetime import datetime; 
def update_status():
    status = {
        'status': 'ACTIVE',
        'agents': ['Architect', 'Logic', 'Commercial'],
        'lastUpdate': datetime.now().strftime('%H:%M:%S'),
        'studio_power': '100%'
    }
    with open('data/status.json', 'w') as f:
        json.dump(status, f)
    print('?? Status Geüpdatet door Logic Agent...')

if __name__ == '__main__':
    update_status()
