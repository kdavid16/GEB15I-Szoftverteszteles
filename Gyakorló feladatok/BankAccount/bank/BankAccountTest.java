package hu.szoftverteszteles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class BankAccountTest {
    private BankAccount account;

    @BeforeEach
    void setUp() {
        account = new BankAccount();
    }

    @Test
    @DisplayName("1. Új számla egyenlege 0")
    void balanceZero() {
        assertEquals(0, account.getBalance());
    }

    @Test
    @DisplayName("2. 1000 deposit-álása")
    void depositOneThousand() {
        account.deposit(1000);
        assertEquals(1000, account.getBalance());
    }

    @Test
    @DisplayName("3. Több fizetés")
    void multipleDeposits() {
        account.deposit(1000);
        account.deposit(1000);
        assertEquals(2000, account.getBalance());
    }

    @Test
    @DisplayName("4. Withdraw teszt")
    void testWithdraw() {
        account.deposit(1000);
        account.withdraw(500);
        assertEquals(500, account.getBalance());
    }

    @Test
    @DisplayName("5. Teljes egyenleg")
    void fullBalance() {
        account.deposit(500);
        account.withdraw(500);
        assertEquals(0, account.getBalance());
    }

    @Test
    @DisplayName("6. Túl nagy egyenleg")
    void tooBigWithdraw() {
        account.deposit(500);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(750));

        assertEquals("Insufficient funds", exception.getMessage());
    }

    @Test
    @DisplayName("7. Negatív befizetés")
    void negativeDeposit() {
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> account.deposit(-500));

        assertEquals("Deposit amount must be greater than zero", exception.getMessage());
    }

    @Test
    @DisplayName("8. nulla összegű befizetés")
    void depositZero() {
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> account.deposit(0));

        assertEquals("Deposit amount must be greater than zero", exception.getMessage());
    }

    @Test
    @DisplayName("9. Negatív kifizetés")
    void negativeWithdraw() {
        account.deposit(1000);
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(-500));

        assertEquals("Withdrawal amount must be greater than zero", exception.getMessage());
    }

    @Test
    @DisplayName("10. nulla összegű pénzfelvétel")
    void zeroWithdraw() {
        account.deposit(1000);
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(0));

        assertEquals("Withdrawal amount must be greater than zero", exception.getMessage());
    }
}
