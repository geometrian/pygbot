import pygame
pygame.init()
surface = pygame.display.set_mode((800,600))
def draw():
    surface.fill((128,)*3)
    pygame.draw.rect(surface,(255,0,0),(10,50,100,50),0)
    pygame.display.flip()
def main():
    while True:
        for event in pygame.event.get(): pass
        draw()
    pygame.quit()
if __name__ == "__main__": main()
