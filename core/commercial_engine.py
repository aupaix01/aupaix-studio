import json; import random; from datetime import datetime;
def generate_license():
    license_id = f'AUX-{random.randint(1000, 9999)}-{random.randint(10, 99)}'
    sale_data = {'id': license_id, 'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'price': 99.00}
    with open('logs/sales.json', 'a') as f:
        f.write(json.dumps(sale_data) + '\n')
    print(f'?? Nieuwe Licentie Gegenereerd: {license_id}')

if __name__ == '__main__':
    generate_license()
