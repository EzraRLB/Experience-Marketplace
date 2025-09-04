import sqlite3

def delete_experience(exp_id):
    conn = sqlite3.connect('experience.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM experiences WHERE id = ?", (exp_id,))
    conn.commit()
    print(f"Deleted experience with ID: {exp_id}")
    conn.close()

def clear_all_experiences():
    conn = sqlite3.connect('experience.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM experiences")
    conn.commit()
    print("All experiences deleted")
    conn.close()

def view_experiences():
    conn = sqlite3.connect('experience.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM experiences")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    conn.close()

if __name__ == "__main__":
    print("1. View all experiences")
    print("2. Delete specific experience")
    print("3. Clear all experiences")
    
    choice = input("Choose option (1-3): ")
    
    if choice == "1":
        view_experiences()
    elif choice == "2":
        exp_id = input("Enter experience ID to delete: ")
        delete_experience(int(exp_id))
    elif choice == "3":
        confirm = input("Are you sure? (yes/no): ")
        if confirm.lower() == "yes":
            clear_all_experiences()