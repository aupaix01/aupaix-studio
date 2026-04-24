import json; import os; from datetime import datetime; 
def sync_core():
    if not os.path.exists('data'): os.makedirs('data')
    status = {
        'status': 'OPERATIONAL',
        'agents': ['Architect', 'Logic', 'Commercial', 'Security'],
        'lastUpdate': datetime.now().strftime('%H:%M:%S'),
        'studio_power': 'CORE_MAX_100%'
    }
    with open('data/status.json', 'w') as f:
        json.dump(status, f)
    print('?? Core Data Synced to Disk.')

if __name__ == '__main__':
    sync_core()
