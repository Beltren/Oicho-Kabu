![Kabufuda Deck](https://preview.redd.it/is-this-kabufuda-set-normal-because-it-has-3-kings-6-fives-v0-xmzakmp69m9a1.jpg?width=1080&crop=smart&auto=webp&s=cb95512e466abbcf94ca20b62683d7473db02582)
# Oicho-Kabu Web Application
## Rules
https://fudawiki.org/en/kabufuda/games/oicho-kabu
## Dealer app
![Desktop App](https://i.ibb.co/Mp0y0tL/Screenshot-2024-06-19-at-14-35-04.png)
## Player app
![Mobile App](https://i.ibb.co/0BYxVb4/Screenshot-2024-06-19-at-14-26-57.png)


Oicho-Kabu is a traditional Japanese card game played with a deck of Kabufuda cards. This web application allows you to manage and track player points, bets, and game rules. The application includes a user interface for desktop and mobile views, with real-time updates using WebSockets.

## Features

- **Player Management**: Add, view, and update players and their points.
- **Bet Management**: Place bets on cards and manage bet points.
- **Game Rules Management**: Set and update game rules such as maximum bet size and starting points.
- **Real-Time Updates**: Automatically update player points and bets across all connected clients using WebSockets.
- **Mobile View**: A dedicated mobile view to manage players and their points.
- **QR Code Generation**: Generate a QR code to easily navigate to the mobile view.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/oicho-kabu.git
    cd oicho-kabu
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the server:

    ```bash
    node server.js
    ```

2. Open your web browser and navigate to:

    ```bash
    http://localhost:3001
    ```

## Usage

### Desktop View

1. **Players Button**: Click to open a popup window displaying the list of current players. You can add a new player by clicking the "Add" button and entering the player's name.

2. **Rules Button**: Click to open a popup window where you can set the maximum bet size and starting points. These values are saved in the backend.

3. **Connect Button**: Click to open a popup window displaying a QR code. Scan the QR code with your mobile device to navigate to the mobile view.

4. **Game Cards**: Four cards are displayed with the options to place bets, win, or lose. Each card shows a table with player names and points.

    - **Bet Button**: Click to open a popup window where you can select a player from a dropdown list and enter the bet points. Click "Add" to place the bet.
    - **Win Button**: Click to open a popup window with buttons (x2, x3, x10) to multiply the bet points and add them to the player's points.
    - **Lose Button**: Click to transfer all points from the card's bets to the master player and clear the bets from the card.

### Mobile View

1. **Players Page**: Navigate to `http://localhost:3001/players-page` or scan the QR code from the desktop view to open the mobile view. This page displays a list of player buttons.

    - **Player Buttons**: Click a player button to view their current points, game cards, and combinations.
    - **Game Cards**: Displayed similarly to the desktop view, allowing you to manage bets and points directly from your mobile device.

## File Structure

- **server.js**: Main server file that sets up the Express server, WebSocket connection, and routes.
- **routes/**: Contains route handlers for players, rules, bets, available bets, payments, and the player page.
- **data/**: Contains data management modules for players, rules, and bets.
- **public/**: Contains static files such as CSS, JavaScript, and images.
- **views/**: Contains EJS templates for rendering HTML pages.
- **eventEmitter.js**: Manages custom events using Node.js's EventEmitter.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.
