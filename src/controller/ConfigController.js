export function configHandler(configIndex, model) {
    // Check if the configIndex is valid
    if (configIndex >= 0 && configIndex < model.configs.length) {
        // Update the currentConfig property
        model.currentConfig = configIndex;

        // You may want to perform additional actions here, such as updating the board
        // or resetting the game state based on the new configuration.
    } else {
        // Handle invalid configIndex, such as showing an error message.
        console.error('Invalid configIndex:', configIndex);
    }
}