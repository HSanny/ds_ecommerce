class PostgresRouter:
    """
    a router to control all database operations on models in the users and orders app
    """

    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'users':
            return 'auth_db'
        
        elif model._meta.app_label == 'orders':
            return 'transaction_db'
    
        return 'default'
    
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'users':
            return 'auth_db'
        elif model._meta.app_label == 'orders':
            return 'transaction_db'
        return 'default'  # MongoDB or other

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'users':
            return db == 'auth_db'
        elif app_label == 'orders':
            return db == 'transaction_db'
        return None