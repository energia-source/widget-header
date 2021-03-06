(function (window) {

    'use strict';

    class Menu {

        /**
         * Create a new JavaScript object with a profile property
         * @param profile - The name of the profile to use.
         */

        constructor(profile) {
            this.profile = profile;
            this.elements = {};
        }

        /**
         * Get the profile of the current user
         * @returns The profile object.
         */

        getProfile() {
            return this.profile;
        }

        /**
         * *Get the container element for the submenu. If it doesn't exist, create it.*
         * 
         * The function starts by checking if the container element exists. If it does, it returns it.
         * If it doesn't, it creates it
         * @returns The container element.
         */

        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            this.elements.container = document.createElement('ul');
            this.elements.container.className = 'submenu';
            return this.elements.container;
        }

        /**
         * Create a list item with an anchor tag and a text node
         * @param text - The text that will be displayed in the menu.
         * @param material - The material icon name.
         * @param func - A function that will be called when the link is clicked.
         * @returns The anchor element.
         */

        addItem(text, material, func) {
            let li = document.createElement('li'), a = document.createElement('a'), node = document.createTextNode(text), i = this.getProfile().getHeader().getIcon(material);

            a.appendChild(i);
            a.appendChild(node);

            if (typeof func === 'function') a.addEventListener('click', func.bind(this));

            li.appendChild(a);
            this.getContainer().appendChild(li);

            return a;
        }

        /**
         * Get the container of the current cell
         * @returns The container element.
         */

        out() {
            return this.getContainer();
        }

        /**
         * A JavaScript event handler.
         * @param event - The event object that was passed to the function.
         * @returns The `handleEvent` method is being returned.
         */

        handleEvent(event) {
            let attribute = window.Header.closestAttribute(event.target, window.Header.handle());
            if (attribute === null) return;

            let attribute_split = attribute.split(/\s+/);
            for (let item = 0; item < attribute_split.length; item++) {
                let execute = attribute_split[item].split(String.fromCharCode(58));
                if (execute.length !== 2) break;
                if (execute[0] === event.type || 0 === execute[0].length) {
                    if (typeof this[execute[1]] !== 'function') continue;

                    this[execute[1]].call(this, event);
                }
            }
        }

        /**
         * Add the class 'show' to the container of the component
         * @returns The element.
         */

        show() {
            this.getContainer().classList.add('show');
            return this;
        }

       /**
        * Remove the class 'show' to the container of the component
        * @returns The element.
        */

        hide() {
            this.getContainer().classList.remove('show');
            return this;
        }

        /**
         * Returns a boolean indicating whether the modal is currently shown
         * @returns The method returns a boolean value.
         */

        status() {
            return this.getContainer().classList.contains('show');
        }
    }

    class Profile {

        /**
         * The function returns a string containing the JavaScript code to create a person object
         * @returns The person() function returns a base64 encoded string.
         */

        static person() {
            return 'PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTUwLjAwMDAwMHB0IiBoZWlnaHQ9IjE1MC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDE1MC4wMDAwMDAgMTUwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTUwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTU0NSAxNDgwIGMtMjU5IC03NSAtNDU0IC0yNzIgLTUyNiAtNTMyIC0yNyAtOTUgLTI3IC0zMDEgMCAtMzk2IDczCi0yNjMgMjcwIC00NjAgNTMzIC01MzMgOTUgLTI3IDMwMSAtMjcgMzk2IDAgMjYzIDczIDQ2MCAyNzAgNTMzIDUzMyAyNyA5NSAyNwozMDEgMCAzOTYgLTUwIDE4MiAtMTUwIDMyMSAtMzE3IDQzOCAtNDYgMzIgLTE0MSA3NSAtMjE2IDk1IC05MSAyNSAtMzE0IDI1Ci00MDMgLTF6IG0zODQgLTI0NSBjMzAgLTggNjMgLTIzIDc0IC0zNCAxOSAtMTkgMTkgLTIxIDMgLTQ1IC0yNSAtMzkgLTk3IC03MAotMjU2IC0xMTAgLTE2NSAtNDEgLTIyMyAtNjAgLTIyNyAtNzMgLTMgLTkgNTAgLTIzIDIyNyAtNjMgMjA5IC00NyAyNzEgLTgyCjI3MyAtMTU0IDIgLTc2IC03MSAtMTE3IC0zMDMgLTE2NyAtMTU3IC0zNSAtMjAwIC00NyAtMjAwIC01OSAwIC0xMCA2MSAtMjgKMjQ2IC03NSAxMzYgLTM0IDIwNyAtNjQgMjM3IC05OCAxOSAtMjIgMjAgLTI3IDkgLTQzIC0xOCAtMjggLTEzOSAtNjQgLTIwNwotNjMgbC0zMCAxIDM1IDEwIGMxOSA1IDYxIDE3IDkzIDI1IDMxIDkgNTcgMjEgNTcgMjggMCAxNCAtODAgMzggLTIyMCA2NgotMTk4IDM4IC0yNTkgNTggLTMwNCAxMDAgLTI4IDI3IC0yOCA5MSAwIDExOCA0MyA0MCA1OCA0NCAzMzkgMTEyIDUwIDEyIDk5CjI2IDEwOSAzMSAxNyAxMCAxOCAxMSAzIDIwIC0xNyA5IC04NSAyNyAtMjU1IDY3IC0xMTkgMjggLTE3MyA1MiAtMjAwIDg2IC0yOAozNSAtMjggNjUgLTEgOTkgMzcgNDcgOTggNjkgMzA5IDExMSAxMzAgMjcgMjEzIDUwIDIxNyA2MiA0IDEyIC01NSAzNiAtMTM0CjUzIC0yOSA3IC01MyAxNCAtNTMgMTcgMCA3IDk2IC02IDE1OSAtMjJ6Ii8+CjwvZz4KPC9zdmc+';
        }

        /**
         * Create a new instance of the Profile class and pass it the header instance
         * @param header - The header object that the menu is being created for.
         */

        constructor(header) {
            this.header = header;

            this.elements = {};
            this.elements.menu = new window.Header.Menu(this);
        }

        /**
         * Get the object Header
         * @returns The object Header.
         */

        getHeader() {
            return this.header;
        }

       /**
        * Get the menu element
        * @returns The menu element.
        */

        getMenu() {
            return this.elements.menu;
        }

        /**
         * Create a container element that contains the username, image, and menu
         * @returns The container element.
         */

        getContainer() {
            if (this.elements.hasOwnProperty('container')) return this.elements.container;
            let username = this.getUsername(), image = this.getImage(), menu = this.getMenu().out();
            this.elements.container = document.createElement('div');
            this.elements.container.className = 'inline';
            this.elements.container.appendChild(username);
            this.elements.container.appendChild(image);
            this.elements.container.appendChild(menu);
            this.elements.container.setAttribute(window.Header.handle(), ':show');
            this.elements.container.addEventListener('click', this.getMenu(), false);
            return this.elements.container;
        }

        /**
         * Create a span element with the class of "username" if one doesn't already exist
         * @returns The username span element.
         */

        getUsername() {
            if (this.elements.hasOwnProperty('username')) return this.elements.username;
            this.elements.username = document.createElement('span');
            this.elements.username.className = 'username';
            return this.elements.username;
        }

        /**
         * *Create a text node and append it to the username element.*
         * @param text - The text to be displayed in the username field.
         * @returns The `setUsername` method returns the `this` object.
         */

        setUsername(text) {
            let node = document.createTextNode(text);
            this.getUsername().appendChild(node);
            return this;
        }

       /**
        * Create an image element and set its src attribute to a base64 encoded SVG string
        * @returns The image element.
        */

        getImage() {
            if (this.elements.hasOwnProperty('image')) return this.elements.image;
            this.elements.image = document.createElement('img');
            this.elements.image.className = 'image';
            this.elements.image.setAttribute('src', 'data:image/svg+xml;base64,' + this.constructor.person());
            return this.elements.image;
        }

        /**
         * Set the image source of the image element
         * @param src - The URL of the image.
         * @returns The object.
         */

        setImage(src) {
            if (typeof src !== 'string'
                || src.length < 4) return this;

            this.getImage().setAttribute('src', src);
            return this;
        }

       /**
        * Get the container of the current cell
        * @returns The container element.
        */

        out() {
            return this.getContainer();
        }
    }

    class Header {

        /**
         * It returns a string.
         * @returns The handle() method returns the string 'data-handle-event'.
         */

        static handle() {
            return 'data-handle-event';
        }

        /**
         * The constructor function creates an object that has a url property and an elements property.
         * 
         * The elements property has a profile property that is an instance of the Profile class
         */

        constructor() {
            this.url = String.fromCharCode(47);
            this.elements = {};
            this.elements.profile = new window.Header.Profile(this);
        }

        /**
         * Get the URL of the current page
         * @returns The url property of the object.
         */

        getUrl() {
            return this.url;
        }

        /**
         * Set the URL for the REST API
         * @param url - The URL of the file to be downloaded.
         * @returns The `setUrl` method returns the `this` object.
         */

        setUrl(url) {
            this.url = url;
            return this;
        }

        /**
         * Get the profile element
         * @returns The profile element.
         */

        getProfile() {
            return this.elements.profile;
        }

        /**
         * Create an HTML element with the class `material-icons` and the innerText of the `name`
         * parameter
         * @param name - The name of the icon.
         * @returns The icon that was created.
         */

        getIcon(name) {
            let icon = document.createElement('i');
            icon.className = 'material-icons';
            icon.innerText = name;
            return icon;
        }

        /**
         * Create a new HTML element with the tag "h6" and the class "title"
         * @returns The title element.
         */

        getTitle() {
            if (this.elements.hasOwnProperty('title')) return this.elements.title;
            this.elements.title = document.createElement('h6');
            this.elements.title.className = 'title';
            return this.elements.title;
        }

        /**
         * * Create a link element with the text of the current URL.
         * * Append the link to the title element.
         * * Return the current instance of the page object
         * @param text - The text to be displayed in the title bar.
         * @returns The `setTitle` method returns the `this` object.
         */

        setTitle(text) {
            let a = document.createElement('a'), node = document.createTextNode(text);
            a.href = this.getUrl();
            a.className = 'title-text ellipsis';
            a.appendChild(node);
            this.getTitle().appendChild(a);
            return this;
        }

       /**
        * *Create a header element with a left and right column.*
        * @returns The header row.
        */

        getRow() {
            if (this.elements.hasOwnProperty('header')) return this.elements.header;
            let left = this.getLeft(), right = this.getRight();
            this.elements.header = document.createElement('header');
            this.elements.header.className = 'pure-g';
            this.elements.header.appendChild(left);
            this.elements.header.appendChild(right);
            return this.elements.header;
        }

        /**
         * Create a div with the class name "pure-u-6-24" and append the title to it
         * @returns The title of the question.
         */

        getLeft() {
            if (this.elements.hasOwnProperty('left')) return this.elements.left;
            let title = this.getTitle();
            this.elements.left = document.createElement('div');
            this.elements.left.className = 'pure-u-6-24';
            this.elements.left.appendChild(title);
            return this.elements.left;
        }

        /**
         * *Get the right element of the page.*
         * @returns The right side of the page.
         */

        getRight() {
            if (this.elements.hasOwnProperty('right')) return this.elements.right;
            let profile = this.getProfile().out();
            this.elements.right = document.createElement('div');
            this.elements.right.className = 'pure-u-18-24';
            this.elements.right.appendChild(profile);
            return this.elements.right;
        }

        /**
         * If the user clicks outside of the menu, hide the menu
         * @param event - The event object that was passed to the handler.
         */

        close(event) {
            let profile = this.getProfile(), menu = profile.getMenu(), attribute = this.constructor.closestAttribute(event.target, this.constructor.handle(), true);
            if (attribute !== profile.getContainer() && menu.status()) menu.hide();
        }

       /**
        * Get the row of the current cell
        * @returns The row that was just created.
        */

        out() {
            return this.getRow();
        }

        /**
         * If the event target has a class attribute that matches the handle() function, then execute
         * the function
         * @param event - The event object that was passed to the event handler.
         */

        handleEvent(event) {
            let attribute = this.constructor.closestAttribute(event.target, this.constructor.handle());
            if (attribute === null) return;

            let attribute_split = attribute.split(/\s+/);
            for (let item = 0; item < attribute_split.length; item++) {
                let execute = attribute_split[item].split(String.fromCharCode(58));
                if (execute.length !== 2) break;
                if (execute[0] === event.type || 0 === execute[0].length) {
                    if (typeof this[execute[1]] !== 'function') continue;

                    this[execute[1]].call(this, event);
                }
            }
        }

        /**
         * Find the closest attribute to the target element
         * @param target - The element to search for the closest attribute.
         * @param attribute - The attribute to search for.
         * @param html - If true, the attribute is searched for in the HTML source code.
         * @returns The closest attribute.
         */
        
        static closestAttribute(target, attribute, html) {
            if (typeof attribute === 'undefined'
                || !attribute.length) return null;

            let result = null, element = target;

            do {
                let tagname = element.tagName.toLowerCase();
                if (tagname === 'body') return null;

                result = element.getAttribute(attribute);
                if (result !== null) {
                    result = result.toString();
                    if (result.length) break;
                }

                element = element.parentNode;
            } while (element !== null
                || typeof element === 'undefined');

            if (typeof html === 'undefined'
                || html !== true) return result;

            return element;
        }
    }

    window.Header = Header;
    window.Header.Profile = Profile;
    window.Header.Menu = Menu;

})(window);
