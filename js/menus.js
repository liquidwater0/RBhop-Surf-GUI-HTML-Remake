export { menus, activateMenu }

function menus() {
    const openMenuButtons = document.querySelectorAll("[data-menu-open]");
    const closeMenuButtons = document.querySelectorAll("[data-menu-close-button]");

    let isOpen = false;

    openMenuButtons.forEach(function(openMenuButton) {
        openMenuButton.addEventListener("click", function(event) {
            const isSwitched = event.target.hasAttribute("data-switched");
            
            isOpen = !isOpen;

            activateMenu(event.target.getAttribute("data-menu-open"), isSwitched ? isOpen : true);
        });
    });

    closeMenuButtons.forEach(function(closeMenuButton) {
        closeMenuButton.addEventListener("click", function(event) { 
            activateMenu(event.target.parentElement.parentElement.parentElement.getAttribute("data-menu"), false);
        });
    });
}

function activateMenu(menu, menuState) {
    const allMenus = document.querySelectorAll("[data-menu]");
    const currentMenu = document.querySelector(`[data-menu='${menu}']`);

    allMenus.forEach(function(menu) { menu.classList.remove("menu-open") });
    menuState ? currentMenu.classList.add("menu-open") : currentMenu.classList.remove("menu-open");
}
