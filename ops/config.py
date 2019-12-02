env = {
    'qa': {
        'name': 'if-api-qa',
        'role': 'arn:aws:iam::093604411390:role/if_lambda_dev',
        'vpc': {
            'SubnetIds': ['subnet-0b76b1f8b9b3b733c', 'subnet-0bbc1cc681ff5bfcb'],
            'SecurityGroupIds': ['sg-0d86c9d8f56c01491', 'sg-0ecc89d05b25dca70'],
        },
        'env-vars': {
            'Variables': {
                'env': 'qa',
                'encrypted_key': 'todo',
            }
        }
    },
    'prod': {
        'name': 'if-api-prod',
        'role': 'todo',
        'vpc': {
            'SubnetIds': ['todo'],
            'SecurityGroupIds': ['todo'],
        },
        'env-vars': {
            'Variables': {
                'env': 'prod',
                'encrypted_key': 'todo',
            }
        }
    },
}

const = {
    'runtime': 'nodejs12.x',
    'handler': 'index.handler',
    'description': 'RESTful API layer of InventoryFlo',
    'timeout': 60,
    'memory': 1024,
    'region': 'us-east-2',
    'alias': 'active',
    'exclusions': {
        'dir': ['ops', '.git'],
        'file': ['./.gitignore', './package.json', './package-lock.json', './README.md', './.DS_Store', './if.zip']
    },
}
