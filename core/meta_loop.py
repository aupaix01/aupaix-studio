import json; import os; from datetime import datetime; 
def sync():
    if not os.path.exists('data'): os.makedirs('data')
    data = {
        'status': 'OPERATIONAL',
        'agents': ['Architect', 'Logic', 'Commercial', 'Security'],
        'studio_power': '100%_MAX_LOAD',
        'last_sync': datetime.now().strftime('%H:%M:%S')
    }
    with open('data/status.json', 'w') as f:
        json.dump(data, f)
    print('?? CORE DATA INJECTED.')
if __name__ == '__main__': sync()
