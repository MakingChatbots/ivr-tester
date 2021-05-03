import commander from "commander";

export interface ExitableProgram {
  exit(message: string): void;
  writeOut(message: string): void;
}

export interface Program extends ExitableProgram {
  command: commander.Command;
}

/**
 * Creates program from a command that can unifies the exit strategy between the Command and the rest
 * of the app (i.e. whether to suppress the default behaviour of exiting the process), and outputs
 * text to the terminal in the same way - making capturing console output for testing easier.
 *
 * As I learn more about commands it might make more sense to separate the concept of a Program from Commander's
 * Command, especially since Commander's responsibilities end when it has parsed the Command line, outputting logs
 * and how to exit the program after this isn't its concern.
 */
export function createProgram(
  command: commander.Command,
  suppressProcessExit: boolean
): Program {
  if (suppressProcessExit) {
    command.exitOverride();
  }

  return {
    command,
    writeOut(message: string) {
      command.configureOutput().writeOut(`${message.trimRight()}\n`);
    },
    exit(message: string) {
      command.configureOutput().writeErr(`${message.trimRight()}\n`);

      if (suppressProcessExit) {
        throw Error(message);
      } else {
        process.exit(1);
      }
    },
  };
}
