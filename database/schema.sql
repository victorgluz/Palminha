DROP TABLE `u316331626_scrumtools`.`keys`;
DROP TABLE `u316331626_scrumtools`.`devices`;
DROP TABLE `u316331626_scrumtools`.`users`;
DROP TABLE `u316331626_scrumtools`.`sprints`;
DROP TABLE `u316331626_scrumtools`.`players`;
DROP TABLE `u316331626_scrumtools`.`game_logs`;
DROP TABLE `u316331626_scrumtools`.`teams`;

CREATE TABLE IF NOT EXISTS `u316331626_scrumtools`.`keys` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serial` CHAR(32) NOT NULL,
  `expiration_date` DATE NOT NULL,
  `key_type` TINYINT NOT NULL,
  `has_used` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `u316331626_scrumtools`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u316331626_scrumtools`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` CHAR(32) NOT NULL,
  `is_premium` TINYINT NULL,
  `can_manage_games` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `u316331626_scrumtools`.`teams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u316331626_scrumtools`.`teams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `u316331626_scrumtools`.`game_logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u316331626_scrumtools`.`game_logs` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `teams_id` INT NOT NULL,
  `start_by` VARCHAR(45) NOT NULL,
  `winner` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `teams_id`),
  INDEX `fk_game_logs_teams1_idx` (`teams_id` ASC),
  CONSTRAINT `fk_game_logs_teams1`
    FOREIGN KEY (`teams_id`)
    REFERENCES `u316331626_scrumtools`.`teams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `u316331626_scrumtools`.`devices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u316331626_scrumtools`.`devices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ip` VARCHAR(45) NOT NULL,
  `screen` VARCHAR(45) NULL,
  `user_agent` VARCHAR(255) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_devices_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_devices_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `u316331626_scrumtools`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `u316331626_scrumtools`.`sprints`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u316331626_scrumtools`.`sprints` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `teams_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  PRIMARY KEY (`id`, `teams_id`),
  INDEX `fk_sprints_teams1_idx` (`teams_id` ASC),
  CONSTRAINT `fk_sprints_teams1`
    FOREIGN KEY (`teams_id`)
    REFERENCES `u316331626_scrumtools`.`teams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `u316331626_scrumtools`.`players`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `u316331626_scrumtools`.`players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `teams_id` INT NOT NULL,
  PRIMARY KEY (`id`, `teams_id`),
  INDEX `fk_players_teams1_idx` (`teams_id` ASC),
  CONSTRAINT `fk_players_teams1`
    FOREIGN KEY (`teams_id`)
    REFERENCES `u316331626_scrumtools`.`teams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;