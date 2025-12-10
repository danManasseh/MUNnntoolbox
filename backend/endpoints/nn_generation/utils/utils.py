import sqlite3
import os


class ModelNotFoundError(Exception):
    pass


db_path = "endpoints/instance/db.sqlite3"

if not os.path.exists(db_path):
    db_path = "instance/db.sqlite3"


def update_nn_model_status(nn_model_id, status_string):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute(f"select * from neural_network_model where id={nn_model_id}")
    result = cursor.fetchone()

    if result:
        cursor.execute(f"update neural_network_model set status='{status_string}' where id={nn_model_id}")
        conn.commit()
        return "Status updated successfully"
    else:
        raise ModelNotFoundError(f"Model with Id {nn_model_id} not found.")

    cursor.close()
    conn.close()


def update_nn_prediction_status(nn_prediction_id, status_string):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute(f"select * from neural_network_prediction where id={nn_prediction_id}")
    result = cursor.fetchone()

    if result:
        cursor.execute(f"update neural_network_prediction set status='{status_string}' where id={nn_prediction_id}")
        conn.commit()
        return "Status updated successfully"
    else:
        raise ModelNotFoundError(f"Prediction with Id {nn_prediction_id} not found.")

    cursor.close()
    conn.close()
