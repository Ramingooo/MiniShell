#include "../include/minishell.h"

size_t	ft_strlen(char *s)
{
	size_t	i = 0;
	while (s && s[i])
		i++;
	return (i);
}

void	ft_putchar(char c)
{
	write(1, &c, 1);
}

void	ft_putstr(char *s)
{
	if (s)
		write(1, s, ft_strlen(s));
}

int	main(void)
{
	ft_putstr("Hello World\n");
	return (0);
}
