package MINT;

import MINT.constants.EventType;
import MINT.model.Event;
import MINT.model.Instructor;
import MINT.repository.EventRepository;
import MINT.repository.InstructorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class Initializer {

    @Bean
    CommandLineRunner initData(InstructorRepository instructorRepository,
                               EventRepository eventRepository) {
        return args -> {
            Instructor instructor1 = new Instructor();
            instructor1.setFirstName("Alice");
            instructor1.setLastName("Smith");
            instructor1.setBirthday(LocalDate.of(1985, 5, 20));

            Instructor instructor2 = new Instructor();
            instructor2.setFirstName("Bob");
            instructor2.setLastName("Johnson");
            instructor2.setBirthday(LocalDate.of(1990, 10, 5));

            Instructor instructor3 = new Instructor();
            instructor3.setFirstName("Carol");
            instructor3.setLastName("Williams");
            instructor3.setBirthday(LocalDate.of(1988, 1, 15));

            Instructor instructor4 = new Instructor();
            instructor4.setFirstName("David");
            instructor4.setLastName("Brown");
            instructor4.setBirthday(LocalDate.of(1980, 12, 30));

            Instructor instructor5 = new Instructor();
            instructor5.setFirstName("Eve");
            instructor5.setLastName("Taylor");
            instructor5.setBirthday(LocalDate.of(1995, 7, 10));

            instructorRepository.saveAll(Arrays.asList(instructor1, instructor2, instructor3, instructor4, instructor5));

            createEventsForInstructor(instructor1, eventRepository);
            createEventsForInstructor(instructor2, eventRepository);
            createEventsForInstructor(instructor3, eventRepository);
            createEventsForInstructor(instructor4, eventRepository);
            createEventsForInstructor(instructor5, eventRepository);

            instructorRepository.saveAll(Arrays.asList(instructor1, instructor2, instructor3, instructor4, instructor5));
        };
    }

    private void createEventsForInstructor(Instructor instructor, EventRepository eventRepository) {
        LocalDateTime now = LocalDateTime.now();
        int start;

        Event weekOff = new Event();
        weekOff.setType(EventType.VACATION);
        weekOff.setDescription("One week off");
        start = (int)(Math.random() * 20 + 1);
        weekOff.setStartDate(LocalDate.of(1995, 7, start));
        weekOff.setEndDate(LocalDate.of(1995, 7, start+7));
        weekOff.setInstructor(instructor);

        Event seminar1 = new Event();
        seminar1.setType(EventType.SEMINAR);
        seminar1.setDescription("Seminar on Advanced Topics");
        start = (int)(Math.random() * 20 + 1);
        seminar1.setStartDate(LocalDate.of(1995, 7, start));
        seminar1.setEndDate(LocalDate.of(1995, 7, start+7));
        seminar1.setInstructor(instructor);

        Event seminar2 = new Event();
        seminar2.setType(EventType.SEMINAR);
        seminar2.setDescription("Seminar on Best Practices");
        start = (int)(Math.random() * 20 + 1);
        seminar2.setStartDate(LocalDate.of(1995, 7, start));
        seminar2.setEndDate(LocalDate.of(1995, 7, start+7));
        seminar2.setInstructor(instructor);

        Event projectWeek = new Event();
        projectWeek.setType(EventType.PROJECT_WEEK);
        projectWeek.setDescription("Project Implementation Week");
        start = (int)(Math.random() * 20 + 1);
        projectWeek.setStartDate(LocalDate.of(1995, 7, start));
        projectWeek.setEndDate(LocalDate.of(1995, 7, start+7));
        projectWeek.setInstructor(instructor);

        List<Event> events = Arrays.asList(weekOff, seminar1, seminar2, projectWeek);

        instructor.setEvents(events);

        eventRepository.saveAll(events);
    }
}