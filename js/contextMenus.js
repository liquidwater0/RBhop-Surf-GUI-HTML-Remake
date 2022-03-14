export default class ContextMenu {
    constructor(element, items) {
        this.items = items;

        element.addEventListener("contextmenu", event => {
            if (event.ctrlKey || event.target !== element) return;

            event.preventDefault();
            this.open(event.pageX, event.pageY);
        });

        document.addEventListener("click", () => this.deleteContextMenus());
    }

    deleteContextMenus() {
        const contextMenus = document.querySelectorAll("[data-context-menu]");
        contextMenus.forEach(contextMenu => contextMenu.remove());
    }

    open(xPos, yPos) {
        this.deleteContextMenus();

        document.body.insertAdjacentHTML("afterbegin", `
            <div class="transparent-blur" data-context-menu>
                <ul></ul>
            </div>
        `);

        const contextMenu = document.querySelector("[data-context-menu]");
        const contextMenuList = document.querySelector("[data-context-menu] > ul");

        this.items.forEach(item => {
            const listItem = document.createElement("li");

            listItem.textContent = item.label;
            listItem.addEventListener("click", item.action);

            contextMenuList.appendChild(listItem);
        });

        contextMenu.style.setProperty("--left", xPos);
        contextMenu.style.setProperty("--top", yPos);
    }
}
