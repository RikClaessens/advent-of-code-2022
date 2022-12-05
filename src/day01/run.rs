fn top_x_total_calories(input: &str, top_x: u32) -> u32 {
    let mut elf_calories = input
        .split("\n\n")
        .map(|elf_food| {
            elf_food
                .lines()
                .map(|food| food.parse::<u32>().unwrap())
                .sum::<u32>()
        })
        .collect::<Vec<u32>>();
    elf_calories.sort();
    elf_calories.reverse();
    elf_calories[0..top_x as usize].iter().sum()
}

pub fn main() {
    let input = include_str!("./input.txt");

    let part1 = top_x_total_calories(input, 1);
    let part2 = top_x_total_calories(input, 3);

    println!("Day 01");
    println!("Part 1: {:#?}", part1);
    println!("Part 2: {:#?}", part2);
}

#[test]
fn part1() {
    let test_input = include_str!("./test.txt");
    assert_eq!(top_x_total_calories(test_input, 1), 24000)
}

#[test]
fn part2() {
    let test_input = include_str!("./test.txt");
    assert_eq!(top_x_total_calories(test_input, 3), 45000)
}
