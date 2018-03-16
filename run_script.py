import subprocess
import time

import psutil
import pyscreenshot

import sys


sys.stdout.write("\rRunning program . . .        "); sys.stdout.flush()
proc = subprocess.Popen(["python","tmp/__program.py"],shell=True)

sys.stdout.write("\rWaiting for program . . .    "); sys.stdout.flush()
time.sleep(3.0)

sys.stdout.write("\rTaking screenshot . . .      "); sys.stdout.flush()
image = pyscreenshot.grab()
image.save("tmp/__screenshot.png")

##import os
##os.system("import -window root __screenshot.png")

sys.stdout.write("\rKilling subprocess . . .     "); sys.stdout.flush()
process = psutil.Process(proc.pid)
for proc in process.children(recursive=True):
    proc.kill()
process.kill()

sys.stdout.write("\rComplete!  Returning . . .   \n"); sys.stdout.flush()

##import gtk.gdk
##
##w = gtk.gdk.get_default_root_window()
##sz = w.get_size()
##print "The size of the window is %d x %d" % sz
##pb = gtk.gdk.Pixbuf(gtk.gdk.COLORSPACE_RGB,False,8,sz[0],sz[1])
##pb = pb.get_from_drawable(w,w.get_colormap(),0,0,0,0,sz[0],sz[1])
##if (pb != None):
##    pb.save("__screenshot.png","png")
##    print("Screenshot saved to screenshot.png.")
##else:
##    print("Unable to get the screenshot.")
