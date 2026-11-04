package edu.ku.campushub_api.controller;

import edu.ku.campushub_api.model.Course;
import edu.ku.campushub_api.model.CourseInput;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CourseControllerTest {

    private CourseController courseController;

    @BeforeEach
    void setUp() {
        courseController = new CourseController();
    }

    @Test
    void findsExistingCourse() {
        ResponseEntity<?> response = courseController.getCourseById(101L);

        assertEquals(200, response.getStatusCode().value());
        Course course = (Course) response.getBody();
        assertNotNull(course);
        assertEquals(101L, course.id());
        assertEquals("IS-401", course.code());
    }

    @Test
    void returnsNotFoundForMissingCourse() {
        ResponseEntity<?> response = courseController.getCourseById(9999L);

        assertEquals(404, response.getStatusCode().value());
        assertNull(response.getBody());
    }

    @Test
    void createsValidCourse() {
        CourseInput input = new CourseInput("IS-404", "Software Testing", 3);

        ResponseEntity<?> response = courseController.createCourse(input);

        assertEquals(201, response.getStatusCode().value());
        Course course = (Course) response.getBody();
        assertNotNull(course);
        assertEquals("IS-404", course.code());
        assertEquals(3, course.credit());
    }

    @Test
    void rejectsZeroCredits() {
        CourseInput input = new CourseInput("IS-404", "Software Testing", 0);

        ResponseEntity<?> response = courseController.createCourse(input);

        assertEquals(400, response.getStatusCode().value());
        assertTrue(((String) response.getBody()).contains("positive credit"));
    }

    @Test
    void deletesExistingCourse() {
        ResponseEntity<?> response = courseController.deleteCourse(103L);

        assertEquals(204, response.getStatusCode().value());
        assertEquals(404, courseController.getCourseById(103L).getStatusCode().value());
    }
}
