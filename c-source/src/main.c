#include "../include/minishell.h"

void display_prompt(void) {
    printf("%s", PROMPT);
    fflush(stdout);
}

char **parse_command(char *line) {
    char **args = malloc(64 * sizeof(char*));
    char *token;
    int i = 0;

    token = strtok(line, " \t\n\r");
    while (token != NULL) {
        args[i++] = strdup(token);
        token = strtok(NULL, " \t\n\r");
    }
    args[i] = NULL;
    return args;
}

void free_args(char **args) {
    for (int i = 0; args[i]; i++)
        free(args[i]);
    free(args);
}

void execute_command(char **args) {
    if (args[0] == NULL) return;
    if (strcmp(args[0], "exit") == 0) {
        free_args(args);
        exit(0);
    }
    pid_t pid = fork();
    if (pid == 0) {
        if (execvp(args[0], args) == -1)
            perror("minishell");
        exit(EXIT_FAILURE);
    } else if (pid < 0)
        perror("minishell");
    else
        wait(NULL);
}

int main(void) {
    char line[BUFFER_SIZE];
    char **args;
    while (1) {
        display_prompt();
        if (fgets(line, BUFFER_SIZE, stdin) == NULL) break;
        args = parse_command(line);
        execute_command(args);
        free_args(args);
    }
    return 0;
}
