class LoginPage {
    constructor(page) {
        this.page = page;
    }
    userName() {
       return this.page.locator('#userEmail');
    }
    password() {
        return this.page.locator('#userPassword');
     }
     signInBtn() {
        return this.page.locator('#login');
     }


}

module.exports=LoginPage;