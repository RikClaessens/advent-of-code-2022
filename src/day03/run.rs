fn get_prio(letter: char) -> u32 {
    letter as u32 - if letter.is_lowercase() { 96 } else { 38 }
}

fn sum_of_prios(input: &str) -> u32 {
    input
        .split('\n')
        .map(|rucksack| {
            let first_compartment = &rucksack[0..(rucksack.len() / 2)];
            let second_compartment = &rucksack[(rucksack.len() / 2)..rucksack.len()];

            let duplicate_letter = first_compartment
                .chars()
                .nth(
                    first_compartment
                        .chars()
                        .position(|letter| second_compartment.find(letter) != None)
                        .unwrap(),
                )
                .unwrap();

            get_prio(duplicate_letter)
        })
        .sum()
}

fn sum_of_prios_part_2(input: &str) -> u32 {
    let rucksacks: Vec<&str> = input.split("\n").map(|rucksack| rucksack).collect();
    let mut sum: u32 = 0;
    for i in vec![1; rucksacks.len() / 3].iter().enumerate() {
        let index_of_duplicate_letter = rucksacks[i.0 * 3].chars().position(|letter| {
            rucksacks[i.0 * 3 + 1].find(letter) != None
                && rucksacks[i.0 * 3 + 2].find(letter) != None
        });

        if index_of_duplicate_letter != None {
            let duplicate_letter = rucksacks[i.0 * 3]
                .chars()
                .nth(index_of_duplicate_letter.unwrap())
                .unwrap();
            sum = sum + get_prio(duplicate_letter);
        }
    }
    sum
}

pub fn main() {
    let input = include_str!("./input.txt");

    let part1 = sum_of_prios(input);
    let part2 = sum_of_prios_part_2(input);

    println!("Day 03");
    println!("Part 1: {:#?}", part1);
    println!("Part 2: {:#?}", part2);
}

#[test]
fn part1() {
    let test_input = include_str!("./test.txt");
    assert_eq!(get_prio('a'), 1);
    assert_eq!(get_prio('z'), 26);
    assert_eq!(get_prio('A'), 27);
    assert_eq!(get_prio('Z'), 52);
    assert_eq!(sum_of_prios(test_input), 157);
}

#[test]
fn part2() {
    let test_input = include_str!("./test.txt");
    assert_eq!(sum_of_prios_part_2(test_input), 70)
}
