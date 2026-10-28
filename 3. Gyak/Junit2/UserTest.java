package hu.szoftverteszteles;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {
    @Test
    @DisplayName("Felhasználói funkciók tesztelése")
    void testUser() {
        User user = new User("JohnDoe", "password123", 1);
        assertEquals(1, user.getId());
        assertEquals("JohnDoe", user.getUserName());
        assertEquals("password123", user.getPassword());
        assertEquals(0, user.getLoginCount());

    }

    @Test
    @DisplayName("Bejelentkezések")
    void testLogin() {
        User user = new User("JohnDoe", "password123", 1);
        user.login();
        assertEquals(1, user.getLoginCount());

        user.logout();
        assertEquals(0, user.getLoginCount());

        user.isLoggedIn();
        assertEquals(1, user.getLoginCount());

        user.isLoggedOut();
        assertEquals(0, user.getLoginCount());

        user.isLoggedIn();
        assertEquals(1, user.getLoginCount());

        user.isLoggedOut();
        assertEquals(0, user.getLoginCount());
    }

    @Test
    @DisplayName("Jelszó váltás")
    void testUpdatePwd() {
        User user = new User("JohnDoe", "password123", 1);
        user.updatePwd("newPassword123", true);
        assertEquals("newPassword123", user.getPassword());
        user.updatePwd("newPassword123", false);
        assertEquals("newPassword123", user.getPassword());
    }
}
