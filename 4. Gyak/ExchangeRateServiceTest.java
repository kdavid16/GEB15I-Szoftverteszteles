package hu.szoftverteszteles;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ExchangeRateServiceTest {

    @Test
    @DisplayName("when(...).thenReturn(...) alapvető működése: EUR -> HUF árfolyam beállítása")
    void testGetRateWithWhenThenReturn() {
        // 1. Mock objektum létrehozása az interfészből
        ExchangeRateService rateService = mock(ExchangeRateService.class);

        // 2. Mock viselkedésének beállítása (stubbing):
        // Ha valaki meghívja a getRate("EUR", "HUF") metódust, adjon vissza 400.0-t
        when(rateService.getRate("EUR", "HUF")).thenReturn(400.0);

        // 3. Függvényhívás a mock-on és az érték ellenőrzése
        double rate = rateService.getRate("EUR", "HUF");
        assertEquals(400.0, rate);

        // 4. Igazolás, hogy a mock metódus valóban meg lett hívva a kívánt
        // paraméterekkel
        verify(rateService).getRate("EUR", "HUF");
    }

    @Test
    @DisplayName("Kivétel dobása thenThrow(...) használatával")
    void testGetRateThrowsException() {
        ExchangeRateService rateService = mock(ExchangeRateService.class);
        when(rateService.getRate("XYZ", "HUF"))
                .thenThrow(new IllegalArgumentException("Ismeretlen devizakód"));

        assertThrows(IllegalArgumentException.class, () -> {
            rateService.getRate("XYZ", "HUF");
        });
    }
}
