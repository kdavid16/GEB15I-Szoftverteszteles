package hu.szoftverteszteles;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TriangleTest {
    private Triangle triangle = new Triangle();

    @Test
    @DisplayName("Terület teszt, várt eredmény 6, mivel a = 3, b = 4, c = 5")
    void TestAreaOfTriangle() {

        int a = 3;
        int b = 4;
        int c = 5;

        double expectedArea = 6;
        double actualArea = triangle.getArea(a, b, c);

        assertEquals(expectedArea, actualArea);
    }

    @Test
    @DisplayName("Hegyesszögű derékszögű teszt, várt edermény: true, mivel a = 3, b = 4, c = 5")
    void TestRightAngledTriangle() {

        int a = 3;
        int b = 4;
        int c = 5;

        boolean rightangled = true;
        boolean result = triangle.isRightAngled(a, b, c);

        assertEquals(rightangled, result);
    }

}
