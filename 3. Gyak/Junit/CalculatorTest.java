package hu.szoftverteszteles;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @Test
    @DisplayName("Összeadás tesztelése: 2 + 3 = 5")
    void testAdd() {
        assertEquals(5, calculator.add(2, 3));
    }

    @Test
    @DisplayName("Kivonás tesztelése: 10 - 4 = 6")
    void testSubtract() {
        assertEquals(6, calculator.subtract(10, 4));
    }

    @Test
    @DisplayName("Osztás nullával kivételt kell dobjon")
    void testDivideByZeroThrowsException() {
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> calculator.divide(5, 0)
        );
        assertEquals("Nullával nem lehet osztani!", exception.getMessage());
    }
}
