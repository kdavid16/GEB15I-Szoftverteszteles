package hu.szoftverteszteles;

public class User {
    private String userName;
    private String password;
    private int id;
    private int loginCount;

    public User(String userName, String password, int id) {
        if (userName == null || password == null || id <= 0) {
            throw new IllegalArgumentException("Invalid user data");
        } else {
            this.userName = userName;
            this.password = password;
            this.id = id;
            this.loginCount = 0;
        }
    }

    public boolean isLoggedIn() {
        login();
        return true;
    }

    public boolean isLoggedOut() {
        logout();
        return false;
    }

    public void login() {
        this.loginCount++;
    }

    public void logout() {
        this.loginCount--;
    }

    public boolean updatePwd(String newPwd, boolean isLoggedIn) {
        if (isLoggedIn && newPwd != this.password) {
            this.password = newPwd;
            return true;
        }
        return false;
    }

    public String getUserName() {
        return this.userName;
    }

    public String getPassword() {
        return this.password;
    }

    public int getId() {
        if (this.id > 0) {
            return this.id;
        } else {
            throw new IllegalArgumentException("Invalid user data");
        }
    }

    public int getLoginCount() {
        if (this.loginCount > 0) {
            return this.loginCount;
        } else {
            return 0;
        }
    }

}
