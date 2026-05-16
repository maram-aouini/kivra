# 🐱 Kivra

**Kivra** è un'applicazione web per tenere traccia dei tuoi contenuti preferiti — film, serie TV, anime, manga e libri — tutto in un unico posto.

---

## ✨ Funzionalità

- 📋 **Lista personale** — aggiungi e gestisci i tuoi contenuti con stato (Da iniziare, In corso, Completato)
- 🔍 **Ricerca e filtri** — filtra per tipo di contenuto e stato, cerca per titolo
- ⭐ **Valutazioni e note** — aggiungi un voto e note personali ad ogni contenuto
- 🖼️ **Copertine** — aggiungi immagini di copertina con riposizionamento drag & drop
- 📊 **Overview** — dashboard con statistiche, contenuti in corso e aggiunti di recente
- 👤 **Autenticazione** — registrazione e login con JWT
- 🛡️ **Pannello Admin** — gestione utenti e statistiche globali (solo admin)

---

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.2**
- **Spring Security + JWT**
- **Spring Data JPA**
- **PostgreSQL** (hosted su [Neon](https://neon.tech))

### Frontend
- **Angular 21**
- **Angular Material**
- **TypeScript**
- **SCSS**

### Deploy
- **Frontend** → [Netlify](https://netlify.com)
- **Backend** → [Render](https://render.com)
- **Database** → [Neon](https://neon.tech)

---

## 🚀 Setup locale

### Prerequisiti
- Java 21
- Maven
- Node.js + Angular CLI
- Un database PostgreSQL (o account Neon gratuito)

### Backend

```bash
cd backend
```

Crea il file `src/main/resources/application.properties` con:

```properties
spring.application.name=kivra
spring.datasource.url=jdbc:postgresql://<host>/<dbname>?sslmode=require
spring.datasource.username=<username>
spring.datasource.password=<password>
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
jwt.secret=<chiave_segreta_lunga>
jwt.expiration=86400000
frontend.url=http://localhost:4200
```

Avvia il backend:

```bash
mvn spring-boot:run
```

Il backend sarà disponibile su `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
ng serve
```

Il frontend sarà disponibile su `http://localhost:4200`.

---

## 📁 Struttura del progetto

```
kivra/
├── backend/
│   └── src/main/java/com/kivra/backend/
│       ├── config/         # Security, CORS
│       ├── controller/     # REST Controllers
│       ├── dto/            # Request/Response objects
│       ├── entity/         # Entità JPA
│       ├── repository/     # JPA Repositories
│       ├── security/       # JWT Filter, UserDetails
│       └── service/        # Business logic
│
└── frontend/
    └── src/app/
        ├── core/           # Services, Guards, Interceptors
        ├── features/
        │   ├── auth/       # Login, Register, Home
        │   ├── content/    # Lista, Card, Form, Dettaglio
        │   ├── overview/   # Dashboard
        │   └── admin/      # Pannello admin
        ├── models/         # Interfacce TypeScript
        └── shared/         # Componenti riutilizzabili
```

---

## 🔐 Variabili d'ambiente

Per il deploy, configura le seguenti variabili d'ambiente nel backend:

| Variabile | Descrizione |
|---|---|
| `DB_URL` | URL del database PostgreSQL |
| `DB_USERNAME` | Username del database |
| `DB_PASSWORD` | Password del database |
| `JWT_SECRET` | Chiave segreta per i token JWT |

---

## 📸 Screenshot

<img width="1920" height="1103" alt="image" src="https://github.com/user-attachments/assets/1e8ff6e0-c84a-4530-bc18-7b1e3d45f86c" />
<img width="1920" height="942" alt="image" src="https://github.com/user-attachments/assets/d872303c-8f80-4e2c-859b-b2eb5a294505" />
<img width="1194" height="1317" alt="image" src="https://github.com/user-attachments/assets/d1970410-93f8-43df-9757-e72e4eaf1ab2" />




---

## 📄 Licenza

Questo progetto è a uso personale e didattico.
