use std::collections::HashMap;

const WIN: u32 = 6;
const DRAW: u32 = 3;
const LOSS: u32 = 0;

const HANDSCORE_X: u32 = 1;
const HANDSCORE_Y: u32 = 2;
const HANDSCORE_Z: u32 = 3;

fn get_scores(input: &str) -> u32 {
    let outcomes: HashMap<&str, u32> = HashMap::from([
        ("A X", DRAW + HANDSCORE_X),
        ("A Y", WIN + HANDSCORE_Y),
        ("A Z", LOSS + HANDSCORE_Z),
        ("B X", LOSS + HANDSCORE_X),
        ("B Y", DRAW + HANDSCORE_Y),
        ("B Z", WIN + HANDSCORE_Z),
        ("C X", WIN + HANDSCORE_X),
        ("C Y", LOSS + HANDSCORE_Y),
        ("C Z", DRAW + HANDSCORE_Z),
    ]);

    input
        .split('\n')
        .map(|round| outcomes.get(&round))
        .flatten()
        .sum()
}

fn get_scores_part_2(input: &str) -> u32 {
    let outcomes: HashMap<&str, u32> = HashMap::from([
        ("A X", LOSS + HANDSCORE_Z),
        ("A Y", DRAW + HANDSCORE_X),
        ("A Z", WIN + HANDSCORE_Y),
        ("B X", LOSS + HANDSCORE_X),
        ("B Y", DRAW + HANDSCORE_Y),
        ("B Z", WIN + HANDSCORE_Z),
        ("C X", LOSS + HANDSCORE_Y),
        ("C Y", DRAW + HANDSCORE_Z),
        ("C Z", WIN + HANDSCORE_X),
    ]);

    input
        .split('\n')
        .map(|round| outcomes.get(&round))
        .flatten()
        .sum()
}

pub fn main() {
    let input = include_str!("./input.txt");

    let part1 = get_scores(input);
    let part2 = get_scores_part_2(input);

    println!("Day 02");
    println!("Part 1: {:#?}", part1);
    println!("Part 2: {:#?}", part2);
}

#[test]
fn part1() {
    let test_input = include_str!("./test.txt");
    assert_eq!(get_scores(test_input), 15)
}

#[test]
fn part2() {
    let test_input = include_str!("./test.txt");
    assert_eq!(get_scores_part_2(test_input), 12)
}
