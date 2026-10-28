package hu.arabromai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

public class RomanNumeralConverterTest {

    private RomanNumeralConverter converter;

    @BeforeEach
    void setUp() {
        converter = new RomanNumeralConverter();
    }

    @Test
    @DisplayName("1. iteráció: Az 1-es szám konvertálása 'I'-re")
    void shouldConvert1ToI() {
        assertEquals("I", converter.toRoman(1));
    }

    @Test
    @DisplayName("2. iteráció: A 2 és 3 konvertálása 'II'-re és 'III'-ra (ismétlés)")
    void shouldConvert2And3ToRepeatedI() {
        assertEquals("II", converter.toRoman(2));
        assertEquals("III", converter.toRoman(3));
    }

    @Test
    @DisplayName("3. iteráció: A 4, 5 és 6 konvertálása ('IV', 'V', 'VI')")
    void shouldConvert4And5And6() {
        assertEquals("IV", converter.toRoman(4));
        assertEquals("V", converter.toRoman(5));
        assertEquals("VI", converter.toRoman(6));
    }

    @Test
    @DisplayName("4. iteráció: A 9, 10, 20 és 39 konvertálása ('IX', 'X', 'XX', 'XXXIX')")
    void shouldConvert9AndTens() {
        assertEquals("IX", converter.toRoman(9));
        assertEquals("X", converter.toRoman(10));
        assertEquals("XX", converter.toRoman(20));
        assertEquals("XXXIX", converter.toRoman(39));
    }

    @ParameterizedTest(name = "{0} -> {1}")
    @DisplayName("5. iteráció: Nagyobb római számjegyek (L, C, D, M) és összetett számok")
    @CsvSource({
        "40, XL",
        "50, L",
        "90, XC",
        "100, C",
        "400, CD",
        "500, D",
        "900, CM",
        "1000, M",
        "1994, MCMXCIV",
        "2026, MMXXVI",
        "3999, MMMCMXCIX"
    })
    void shouldConvertLargerAndComplexNumbers(int arabic, String expectedRoman) {
        assertEquals(expectedRoman, converter.toRoman(arabic));
    }

    @ParameterizedTest(name = "Érvénytelen bemenet: {0}")
    @DisplayName("6. iteráció: Érvénytelen tartomány (<= 0 vagy > 3999) kivételt dob")
    @ValueSource(ints = {-10, -1, 0, 4000, 5000})
    void shouldThrowExceptionForOutOfRangeNumbers(int invalidArabic) {
        assertThrows(IllegalArgumentException.class, () -> converter.toRoman(invalidArabic));
    }
}
