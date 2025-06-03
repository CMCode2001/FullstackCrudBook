# 📚 Fullstack CRUD Book

Application web complète (frontend + backend) permettant la **gestion de livres** avec **authentification utilisateur**, réalisée dans le cadre du programme **Projet pratique – Full Stack Developer**.

## 🎯 Fonctionnalités

- ✅ Inscription et connexion (authentification stateless avec JWT)
- 🔐 Connexion avec Google OAuth 2.0
- 📖 Gestion des livres (CRUD complet) :
  - Créer un livre
  - Lire la liste des livres
  - Modifier les informations d’un livre
  - Supprimer un livre
  - Rechercher un livre
  - Filtrer un livre par genre ou par auteur
- ⚙️ Backend sécurisé avec Spring Boot
- 🖥️ Frontend moderne avec React.js
- 🗃️ Base de données relationnelle (MariaDB)
- 🔑 Données sensibles sécurisées avec un fichier `.env`

---

## 🚀 Technologies utilisées

### 🔧 Backend
- Java 21
- Spring Boot
- Spring Security (JWT + Google OAuth2)
- Spring Data JPA
- MariaDB
- Maven
- Dotenv-java (`io.github.cdimascio:dotenv-java`)

### 🎨 Frontend
- React.js (avec Vite)
- Axios
- React Router

---

## 📦 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/CMCode2001/FullstackCrudBook.git
cd FullstackCrudBook
```
*Vous verrez le dossier du front et du back*
    `crud-book-backend`
    `crud-book-front`
### 2. Installer MariaDB et créer la base de données
*Optionnel pour créer la BD car j'ai inclus la directive (`createDatabaseIfNotExist=true`) pour que si l'App ne voit pas la DB, il le crée au démarrage*
*Néamoins vous pouvez le creer dans votre WSL ou ubuntu ou Linux...* nom de la BD : `CrudBookDB`
# Creer maintenant l'utilisateur userBook
```bash
    CREATE DATABASE CrudBookDB;
    CREATE USER 'userBook'@'%' IDENTIFIED BY 'userBook';
    GRANT ALL PRIVILEGES ON *.* TO 'userBook'@'%';
    FLUSH PRIVILEGES;
```
### 3. FRONTEND
  # a. Aller dans le dossier frontend
  ```bash
      cd /crud-book-front
  ```
  # b. Installer les dépendances et lancer l’app React
   ```bash
      npm install
      npm run dev
  ```
*✅ L'application est maintenant accessible sur : `Frontend (React) : http://localhost:5173`*

### 4. BACKEND
  # a. Aller dans le dossier backend
  ```bash
      cd /crud-book-backend
  ```
  # b. Créer un fichier .env (Puisque j'ai protégé le jwt_secret et google_client_id)
   ```bash
      Mettez-y les secrets necessaires
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      JWT_SECRET=your_jwt_secret_key
  ```
  # c. Démarrer le backend 
  ```bash
      ./mvnw spring-boot:run
  ```
*✅ L'application est maintenant accessible sur : `Backend (SpringBoot) : http://localhost:8088`*

### ➪ LANDING PAGE
![image](https://github.com/user-attachments/assets/dd8b9822-edf6-4c4e-879a-30e92a734847)

### ➪ PAGE INSCRIPTION
![image](https://github.com/user-attachments/assets/4f25b0cd-8208-474a-a48e-411ea817dd1c)

### ➪ PAGE CONNEXION
![image](https://github.com/user-attachments/assets/8bef9b6a-74ae-4928-b3b5-7d0e64f93945)

### ➪ PAGE BIBLIOTHEQUE
![image](https://github.com/user-attachments/assets/6592122a-52bf-45ad-8261-7ff7cc96b624)

### ➪ AJOUTER OU CREER UN LIVRE
<img width="706" alt="image" src="https://github.com/user-attachments/assets/9d9500e6-7e7e-4c9f-b14a-63e865d925d2" />

### ➪ MODIFIER UN LIVRE
<img width="710" alt="image" src="https://github.com/user-attachments/assets/6c4e49a7-2fd3-4ebb-ba22-d45d67c56f72" />

### ➪ SUPPRIMER UN LIVRE
<img width="710" alt="image" src="https://github.com/user-attachments/assets/7a18b940-d262-4822-9452-0a3b26777e42" />

### ➪ RECHERCHER UN LIVRE
<img width="718" alt="image" src="https://github.com/user-attachments/assets/6856df94-ccb7-4b13-8d6f-75ec4bc18631" />







