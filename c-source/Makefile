CC = gcc
NAME = minishell
all: $(NAME)
$(NAME):
	mkdir -p obj
	$(CC) -Wall -Wextra -Werror -Iinclude src/main.c -o $(NAME)
clean:
	rm -rf obj
fclean: clean
	rm -f $(NAME)
re: fclean all
