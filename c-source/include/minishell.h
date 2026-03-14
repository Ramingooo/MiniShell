#ifndef MINISHELL_H
# define MINISHELL_H

# include <stdio.h>
# include <stdlib.h>
# include <unistd.h>
# include <string.h>
# include <sys/wait.h>
# include <errno.h>

# define PROMPT "\033[1;32mminishell\033[0m$ "
# define BUFFER_SIZE 1024

void display_prompt(void);
void execute_command(char **args);
char **parse_command(char *line);
void free_args(char **args);

#endif
