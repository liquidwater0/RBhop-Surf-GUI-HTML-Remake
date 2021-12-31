export { menus, activateMenu }

function menus() {
    const openMenuButtons = document.querySelectorAll("[data-menu-open]");
    const closeMenuButtons = document.querySelectorAll("[data-menu-close-button]");

    openMenuButtons.forEach(function(menuButton) {
        menuButton.addEventListener("click", function(event) {
            activateMenu(event.target.getAttribute("data-menu-open"), true);
        });
    });

    closeMenuButtons.forEach(function(closeMenuButton) {
        closeMenuButton.addEventListener("click", function(event) { 
            activateMenu(event.target.parentElement.parentElement.parentElement.getAttribute("data-menu"), false);
        });
    });
}

function activateMenu(menu, isOpen) {
    const allMenus = document.querySelectorAll("[data-menu]");
    const currentMenu = document.querySelector(`[data-menu='${menu}']`);

    isOpen ? currentMenu.style.transform = "translateY(0%)" : allMenus.forEach(function(menu) { menu.style.transform = "translateY(100%)" });
}
